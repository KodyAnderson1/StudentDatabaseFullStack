import csv
import random


class CityAndState:
    def __init__(self, city_name: str, state_id: str, state_name: str):
        self.city_name = city_name
        self.state_id = state_id
        self.state_name = state_name

    def __str__(self):
        return f"{self.city_name} {self.state_name}, {self.state_id}"


class LocationData:
    def __init__(self):
        self.cityList = self.__initList()

    def __initList(self) -> list:
        returnList = []
        with open("cities.csv", "r") as csv_file:
            csv_reader = csv.DictReader(csv_file)
            next(csv_reader)
            for line in csv_reader:
                returnList.append(
                    CityAndState(line["city"], line["state_id"], line["state_name"])
                )
        return returnList

    def get_random_data(self) -> CityAndState:
        return random.choice(self.cityList)
