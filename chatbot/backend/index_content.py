"""
Script to index textbook content into Qdrant vector database
"""
import os
import uuid
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient
from qdrant_client.http import models

load_dotenv()

# Initialize components
embedding_model = SentenceTransformer('BAAI/bge-small-en-v1.5')

qdrant_client = QdrantClient(
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY"),
)

COLLECTION_NAME = "book_content"

def index_sample_content():
    """Index sample textbook content into Qdrant"""
    
    # Sample content from Physical AI & Humanoid Robotics textbook
    sample_texts = [
        "Physical AI represents a paradigm shift from traditional digital AI to embodied intelligence that interacts with the physical world. Unlike conventional AI systems that process data in virtual environments, Physical AI systems must navigate the complexities of real-world physics, dynamics, and environmental uncertainties.",
        
        "Humanoid robots are designed to resemble and mimic human behavior and appearance. They represent one of the most challenging areas of robotics, requiring sophisticated control systems, advanced sensors, and complex algorithms to achieve human-like movement and interaction.",
        
        "The applications of Physical AI and humanoid robotics span numerous fields including healthcare, manufacturing, entertainment, and service industries. These systems promise to revolutionize how humans interact with technology in their daily lives.",
        
        "Kinematics is the study of motion without considering the forces that cause it. In humanoid robotics, kinematics helps determine the position and orientation of robot limbs based on joint angles.",
        
        "Dynamics deals with the forces and torques that cause motion in robotic systems. Understanding dynamics is crucial for controlling humanoid robots effectively.",
        
        "Sensors play a critical role in humanoid robotics, providing feedback about the robot's state and its environment. Common sensors include cameras, IMUs, force sensors, and tactile sensors.",
        
        "Control systems in humanoid robots must manage multiple degrees of freedom while maintaining balance and executing complex tasks. Advanced control algorithms are essential for stable locomotion.",
        
        "Machine learning techniques are increasingly used in humanoid robotics for tasks like motion planning, object recognition, and human-robot interaction.",
        
        "Embodied cognition suggests that intelligence emerges from the interaction between an agent and its environment. This concept is fundamental to Physical AI.",
        
        "The field of Physical AI combines principles from robotics, machine learning, control theory, and biomechanics to create intelligent agents that can operate in the physical world."
    ]
    
    # Prepare points for Qdrant
    points = []
    for i, text in enumerate(sample_texts):
        # Generate embedding
        embedding = embedding_model.encode(text).tolist()
        
        # Create point
        point = models.PointStruct(
            id=i,
            vector=embedding,
            payload={
                "text": text,
                "source": "physical_ai_textbook",
                "section": f"sample_content_{i}",
                "page": i + 1
            }
        )
        points.append(point)
    
    # Upsert points to Qdrant
    try:
        qdrant_client.upsert(
            collection_name=COLLECTION_NAME,
            points=points
        )
        print(f"Successfully indexed {len(points)} text chunks to Qdrant collection: {COLLECTION_NAME}")
        return True
    except Exception as e:
        print(f"Error indexing content to Qdrant: {e}")
        return False

if __name__ == "__main__":
    print("Indexing Physical AI textbook content to Qdrant...")
    success = index_sample_content()
    if success:
        print("Content indexing completed successfully!")
    else:
        print("Content indexing failed!")