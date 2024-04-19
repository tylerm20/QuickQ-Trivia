import gspread

gc = gspread.oauth()

sh = gc.open("Quiz Questions")

us_history = sh.worksheet("US History")
world_history = sh.worksheet("World History")
science = sh.worksheet("Science")
geography = sh.worksheet("Geography")
arts_and_lit = sh.worksheet("Arts & Literature")
entertainment = sh.worksheet("Entertainment")
sports = sh.worksheet("Sports")
current_events = sh.worksheet("Current Events")

print(us_history.get_all_records()[0]) # this prints the first row as a dict

