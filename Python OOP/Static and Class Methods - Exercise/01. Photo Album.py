import math


class PhotoAlbum:
    def __init__(self, pages: int):
        self.pages = pages
        self.photos = []
        for i in range(pages):
            self.photos.append([])
        self.last_row_index = 0

    @staticmethod
    def from_photos_count(photos_count: int):
        return PhotoAlbum(math.ceil(photos_count/4))

    def add_photo(self, label: str):
        last_col_index = len(self.photos[self.last_row_index])
        if last_col_index == 4 and self.last_row_index == self.pages - 1:
            return "No more free slots"
        else:
            if last_col_index == 4:
                self.last_row_index += 1
                last_col_index = 0
            self.photos[self.last_row_index].append(label)
            return f"{label} photo added successfully on page {self.last_row_index+1} slot {last_col_index+1}"

    def display(self):
        result = "-----------"
        for i in range(self.pages):
            result += "\n"
            photos = '[] '*len(self.photos[i])
            result += photos.rstrip()
            result += "\n"
            result += "-----------"
        return result


album = PhotoAlbum(1)

print(album.add_photo("baby"))
print(album.add_photo("first grade"))
print(album.add_photo("prom"))
print(album.add_photo("wedding"))

print(album.display())
