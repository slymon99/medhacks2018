import unittest
from server import splitAndMerge

class TestJSON(unittest.TestCase):

    def test_splitAndMerge(self):
        self.assertEqual({"Bananas":3, "Apples":3, "Orange": 5}, splitAndMerge('{"Bananas": 2, "Apples": 3},{"Bananas":1,"Oranges":5}'))

if __name__ == '__main__':
    unittest.main()