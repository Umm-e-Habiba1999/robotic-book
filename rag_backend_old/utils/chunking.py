# import re
# from typing import List, Tuple
# from schemas.schemas import DocumentChunk
# import uuid


# def chunk_text(content: str, chunk_size: int = 1024, overlap: int = 100) -> List[str]:
#     """
#     Split text into overlapping chunks of specified size
#     """
#     if len(content) <= chunk_size:
#         return [content]

#     chunks = []
#     start = 0

#     while start < len(content):
#         end = start + chunk_size

#         # If we're near the end, include the remainder
#         if end >= len(content):
#             end = len(content)
#         else:
#             # Try to break at sentence boundary
#             while end > start + chunk_size - overlap and end < len(content) and content[end] not in '.!?':
#                 end += 1

#             # If no sentence boundary found, break at word boundary
#             if end == start + chunk_size:
#                 while end > start + chunk_size - overlap and end < len(content) and content[end] != ' ':
#                     end += 1

#         chunk = content[start:end].strip()
#         if chunk:
#             chunks.append(chunk)

#         # Move start forward, considering overlap
#         start = end - overlap if end < len(content) else len(content)

#         # Skip if start position hasn't moved forward to avoid infinite loop
#         if start <= end - chunk_size:
#             start = end

#     return chunks


# def chunk_markdown(content: str, chunk_size: int = 1024) -> List[str]:
#     """
#     Split markdown content respecting section boundaries
#     """
#     # Split by headers first to preserve document structure
#     header_pattern = r'\n#{1,6}\s+(.+?)\n'
#     parts = re.split(header_pattern, content)

#     chunks = []
#     current_chunk = ""

#     # Process parts in pairs (header, content)
#     i = 0
#     while i < len(parts):
#         if i == 0:
#             # First part is content before any headers
#             section_content = parts[i]
#         else:
#             # This is a header followed by content
#             header = parts[i]
#             if i + 1 < len(parts):
#                 section_content = f"\n# {header}\n{parts[i + 1]}"
#                 i += 1  # Skip the next part since we used it
#             else:
#                 section_content = f"\n# {header}\n"

#         # If this section alone is too large, chunk it further
#         if len(section_content) > chunk_size:
#             sub_chunks = chunk_text(section_content, chunk_size, overlap=200)
#             for sub_chunk in sub_chunks:
#                 if len(current_chunk + sub_chunk) <= chunk_size:
#                     current_chunk += sub_chunk
#                 else:
#                     if current_chunk.strip():
#                         chunks.append(current_chunk.strip())
#                     current_chunk = sub_chunk
#         else:
#             # Check if adding this section exceeds chunk size
#             if len(current_chunk + section_content) <= chunk_size:
#                 current_chunk += section_content
#             else:
#                 if current_chunk.strip():
#                     chunks.append(current_chunk.strip())
#                 current_chunk = section_content

#         i += 1

#     # Add the final chunk if it exists
#     if current_chunk.strip():
#         chunks.append(current_chunk.strip())

#     return chunks


# def create_document_chunks(content: str, doc_id: str, title: str, source_path: str = None, chunk_size: int = 1024) -> List[DocumentChunk]:
#     """
#     Create DocumentChunk objects from content
#     """
#     # Use markdown-aware chunking for the textbook content
#     text_chunks = chunk_markdown(content, chunk_size)

#     chunks = []
#     for i, chunk_text in enumerate(text_chunks):
#         chunk = DocumentChunk(
#             id=str(uuid.uuid4()),
#             content=chunk_text,
#             doc_id=doc_id,
#             source_path=source_path,
#             chunk_index=i,
#             metadata={
#                 "title": title,
#                 "chunk_size": len(chunk_text),
#                 "chunk_index": i
#             }
#         )
#         chunks.append(chunk)

#     return chunks







import re
from typing import List, Tuple
from schemas.schemas import DocumentChunk
import uuid


def chunk_text(content: str, chunk_size: int = 1024, overlap: int = 100) -> List[str]:
    """
    Split text into overlapping chunks of specified size
    """
    if len(content) <= chunk_size:
        return [content]

    chunks = []
    start = 0

    while start < len(content):
        end = start + chunk_size

        # If we're near the end, include the remainder
        if end >= len(content):
            end = len(content)
        else:
            # Try to break at sentence boundary
            while end > start + chunk_size - overlap and end < len(content) and content[end] not in '.!?':
                end += 1

            # If no sentence boundary found, break at word boundary
            if end == start + chunk_size:
                while end > start + chunk_size - overlap and end < len(content) and content[end] != ' ':
                    end += 1

        chunk = content[start:end].strip()
        if chunk:
            chunks.append(chunk)

        # Move start forward, considering overlap
        start = end - overlap if end < len(content) else len(content)

        # Skip if start position hasn't moved forward to avoid infinite loop
        if start <= end - chunk_size:
            start = end

    return chunks


def chunk_markdown(content: str, chunk_size: int = 1024) -> List[str]:
    """
    Split markdown content respecting section boundaries.
    Falls back to normal chunking if headers are not detected.
    """
    if not content or not content.strip():
        return []

    # Normalize line endings (Windows fix)
    content = content.replace("\r\n", "\n")

    # Remove or separate image references to preserve them in chunks
    # This regex finds markdown image syntax ![alt text](image_path)
    image_pattern = r'(!\[.*?\]\(.+?\))'
    parts_with_images = re.split(image_pattern, content)

    # Reconstruct content with image placeholders to maintain context
    processed_parts = []
    for part in parts_with_images:
        if part.startswith('!['):  # This is an image
            processed_parts.append(part)
        else:  # This is regular text
            # Split by headers while preserving the structure
            header_pattern = r'(?:^|\n)(#{1,6}\s+.+?)(?=\n|$)'
            subparts = re.split(header_pattern, part)

            for subpart in subparts:
                if subpart.strip():
                    # Check if this part is a header or content
                    if re.match(r'^#{1,6}\s+', subpart.strip()):
                        processed_parts.append(subpart.strip())
                    elif subpart.strip():
                        processed_parts.append(subpart)

    # Now process the parts to create chunks while keeping related content together
    chunks = []
    current_chunk = ""

    i = 0
    while i < len(processed_parts):
        part = processed_parts[i]

        # If this is a header, combine it with the next content part
        if part.strip().startswith("#") and i + 1 < len(processed_parts):
            combined_part = part + "\n" + processed_parts[i + 1]
            i += 1  # Skip the next part as we've combined it
        else:
            combined_part = part

        if len(combined_part) > chunk_size:
            # If a single part (especially a header or large content) is too big, split it
            sub_chunks = chunk_text(combined_part, chunk_size, overlap=200)
            for sub_chunk in sub_chunks:
                if len(current_chunk + sub_chunk) <= chunk_size:
                    current_chunk += sub_chunk
                else:
                    if current_chunk.strip():
                        chunks.append(current_chunk.strip())
                    current_chunk = sub_chunk
        else:
            # Check if adding this part exceeds chunk size
            if len(current_chunk + combined_part) <= chunk_size:
                current_chunk += combined_part
            else:
                if current_chunk.strip():
                    chunks.append(current_chunk.strip())
                current_chunk = combined_part

        i += 1

    # Add the final chunk if it exists
    if current_chunk.strip():
        chunks.append(current_chunk.strip())

    return chunks


def create_document_chunks(content: str, doc_id: str, title: str, source_path: str = None, chunk_size: int = 1024) -> List[DocumentChunk]:
    """
    Create DocumentChunk objects from content
    """
    # Use markdown-aware chunking for the textbook content
    text_chunks = chunk_markdown(content, chunk_size)

    chunks = []
    for i, chunk_text in enumerate(text_chunks):
        chunk = DocumentChunk(
            id=str(uuid.uuid4()),
            content=chunk_text,
            doc_id=doc_id,
            source_path=source_path,
            chunk_index=i,
            metadata={
                "title": title,
                "chunk_size": len(chunk_text),
                "chunk_index": i
            }
        )
        chunks.append(chunk)

    return chunks
