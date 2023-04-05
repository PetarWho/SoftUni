from project.category import Category
from project.document import Document
from project.topic import Topic


class Storage:
    def __init__(self):
        self.categories = []
        self.topics = []
        self.documents = []

    def add_category(self, category: Category):
        if category not in self.categories:
            self.categories.append(category)

    def add_topic(self, topic: Topic):
        if topic not in self.topics:
            self.topics.append(topic)

    def add_document(self, document: Document):
        if document not in self.documents:
            self.documents.append(document)

    def edit_category(self, category_id: int, new_name: str):
        for x in self.categories:
            if x.id == category_id:
                x.name = new_name
                break

    def edit_topic(self, topic_id: int, new_topic: str, new_storage_folder: str):
        for x in self.topics:
            if x.id == topic_id:
                x.topic = new_topic
                x.storage_folder = new_storage_folder
                break

    def edit_document(self, document_id: int, new_file_name: str):
        for x in self.documents:
            if x.id == document_id:
                x.file_name = new_file_name
                break

    def delete_category(self, category_id: int):
        for x in self.categories:
            if x.id == category_id:
                self.categories.remove(x)
                break

    def delete_topic(self, topic_id: int):
        for x in self.topics:
            if x.id == topic_id:
                self.topics.remove(x)
                break

    def delete_document(self, document_id: int):
        for x in self.documents:
            if x.id == document_id:
                self.documents.remove(x)
                break

    def get_document(self, document_id: int):
        for x in self.documents:
            if x.id == document_id:
                return x

    def __repr__(self):
        return '\n'.join([d.__repr__() for d in self.documents])
