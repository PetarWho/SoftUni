import unittest
from project.tennis_player import TennisPlayer


class TestTennisPlayer(unittest.TestCase):
    def setUp(self):
        self.player1 = TennisPlayer("Rafael Nadal", 35, 9895.0)
        self.player2 = TennisPlayer("Daniil Medvedev", 25, 9895.0)
        self.player3 = TennisPlayer("Roger Federer", 40, 6630.0)

    def test_constructor_wins_empty(self):
        self.assertEqual(self.player1.wins, [])

    def test_name_property(self):
        self.assertEqual(self.player1.name, "Rafael Nadal")
        with self.assertRaises(ValueError):
            self.player1.name = "Jo"
        self.assertEqual(self.player1.name, "Rafael Nadal")

    def test_age_property(self):
        self.assertEqual(self.player1.age, 35)
        with self.assertRaises(ValueError):
            self.player1.age = 16
        self.assertEqual(self.player1.age, 35)

    def test_points_property(self):
        self.assertEqual(self.player1.points, 9895.0)
        self.assertEqual(self.player2.points, 9895.0)

    def test_wins_property(self):
        self.assertEqual(self.player1.wins, [])
        self.assertEqual(self.player2.wins, [])

    def test_add_new_win_value_error(self):
        player = TennisPlayer("John Doe", 25, 100.0)
        try:
            player.add_new_win(123)
        except ValueError as e:
            assert str(e) == "Tournament name should be a string!"

    def test_add_new_win_adds_tournament(self):
        player = TennisPlayer("John Doe", 25, 100.0)
        player.add_new_win("US Open")
        assert player.wins == ["US Open"]

    def test_add_new_win_does_not_add_existing_tournament(self):
        player = TennisPlayer("John Doe", 25, 100.0)
        player.add_new_win("US Open")
        player.add_new_win("US Open")
        assert player.wins == ["US Open"]

    def test_lt_type_error(self):
        player1 = TennisPlayer("John Doe", 25, 100.0)
        player2 = 123
        try:
            player1 < player2
        except AttributeError as e:
            assert str(e) == "'int' object has no attribute 'points'"

    def test_lt_equal_points(self):
        player1 = TennisPlayer("John Doe", 25, 100.0)
        player2 = TennisPlayer("Jane Doe", 30, 100.0)
        assert (player1 < player2) == "John Doe is a better player than Jane Doe"

    def test_add_new_win_success(self):
        result = self.player1.add_new_win("French Open")
        self.assertEqual(result, None)
        self.assertIn("French Open", self.player1.wins)

    def test_str_multiple_tournaments_won(self):
        player = TennisPlayer("Serena Williams", 39, 8510.0)
        player.add_new_win("US Open")
        player.add_new_win("Wimbledon")
        player.add_new_win("French Open")

        expected_output = "Tennis Player: Serena Williams\n" \
                          "Age: 39\n" \
                          "Points: 8510.0\n" \
                          "Tournaments won: US Open, Wimbledon, French Open"

        assert str(player) == expected_output

    def test_add_new_win_already_added(self):
        self.player1.wins = ["French Open", "Wimbledon"]
        result = self.player1.add_new_win("French Open")
        self.assertEqual(result, "French Open has been already added to the list of wins!")
        self.assertEqual(len(self.player1.wins), 2)
        self.assertIn("French Open", self.player1.wins)
        self.assertIn("Wimbledon", self.player1.wins)

    def test_lt_self_points_less_than_other(self):
        result = self.player3 < self.player1
        self.assertEqual(result, "Rafael Nadal is a top seeded player and he/she is better than Roger Federer")

    def test_lt_self_points_greater_than_other(self):
        result = self.player1 < self.player3
        self.assertEqual(result, "Rafael Nadal is a better player than Roger Federer")

    def test_lt_self_points_equal_to_other(self):
        result = self.player1 < self.player2
        self.assertEqual(result, "Rafael Nadal is a better player than Daniil Medvedev")

    def test_str_magic_method(self):
        self.assertEqual(str(self.player1), "Tennis Player: Rafael Nadal\nAge: 35\nPoints: 9895.0\nTournaments won: ")

    def test_string_representation(self):
        expected_output = "Tennis Player: Rafael Nadal\nAge: 35\nPoints: 9895.0\nTournaments won: "
        self.assertEqual(str(self.player1), expected_output)

        self.player1.add_new_win("Roland Garros")
        expected_output += "Roland Garros"
        self.assertEqual(str(self.player1), expected_output)

        self.assertEqual(str(self.player2),
                         "Tennis Player: Daniil Medvedev\nAge: 25\nPoints: 9895.0\nTournaments won: ")

        self.player2.add_new_win("US Open")
        expected_output = "Tennis Player: Daniil Medvedev\nAge: 25\nPoints: 9895.0\nTournaments won: US Open"
        self.assertEqual(str(self.player2), expected_output)

        self.assertEqual(str(self.player3), "Tennis Player: Roger Federer\nAge: 40\nPoints: 6630.0\nTournaments won: ")
        self.player3.add_new_win("Wimbledon")
        expected_output = "Tennis Player: Roger Federer\nAge: 40\nPoints: 6630.0\nTournaments won: Wimbledon"
        self.assertEqual(str(self.player3), expected_output)

    def test_tennis_player_constructor(self):
        player = TennisPlayer("Serena Williams", 39, 8510.0)
        assert player.name == "Serena Williams"
        assert player.age == 39
        assert player.points == 8510.0
        assert player.wins == []

        try:
            player = TennisPlayer("A", 25, 5000.0)
            assert False, "Name should be more than 2 symbols!"
        except ValueError as e:
            assert str(e) == "Name should be more than 2 symbols!"

        try:
            player = TennisPlayer("Novak Djokovic", 17, 9825.0)
            assert False, "Players must be at least 18 years of age!"
        except ValueError as e:
            assert str(e) == "Players must be at least 18 years of age!"

        player = TennisPlayer("Rafael Nadal", 35, -100.0)
        assert player.points == -100.0

    def test_tennis_player_properties(self):
        # Test valid input
        player = TennisPlayer("Roger Federer", 40, 7265.0)
        player.name = "R. Federer"
        assert player.name == "R. Federer"
        player.age = 38
        assert player.age == 38

        try:
            player.name = "A"
            assert False, "Name should be more than 2 symbols!"
        except ValueError as e:
            assert str(e) == "Name should be more than 2 symbols!"

        try:
            player.age = 17
            assert False, "Players must be at least 18 years of age!"
        except ValueError as e:
            assert str(e) == "Players must be at least 18 years of age!"

            
if __name__ == '__main__':
    unittest.main()
