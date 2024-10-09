import pandas as pd # Imports pandas and refers to it as pd

def findName(name,outputFile): # Popular names
  allNames = pd.read_csv("allNames.csv",sep="\t")
  colNames = ["artist","song","year","name"]
  subset = allNames[colNames]
  subset = subset.drop_duplicates()
  out = subset.loc[subset["name"] == name]
  out = out.drop(columns="name")
  out.to_csv(outputFile, sep='\t', index=False) 
  # Seven lines of code
  
def findUniqueNameSongs(threshold, outputfile): # Unique names
  allNames = pd.read_csv("allNames.csv", sep="\t") # Opens csv of songs
  colNames = ["artist","song","name"] # Creates column parameters for the subset
  subset = allNames[colNames] # Creates subset
  subset = subset.drop_duplicates() # Removes duplicates of same name in a song
  subset = subset.groupby(["artist","song"],as_index=False).count() # Compiles unique names into one variable for each song
  test = subset.sort_values(["name"], ascending=[False]) # Makes the dataframe in descending order
  out = test.loc[test["name"] >= threshold] # Initializes the threshold for unique name instances
  out = out.rename(columns={'name':'number'}) # Renames "name" column to "number" (of unique names)
  out.to_csv(outputfile, sep=',', index=False) # Writes dataframe onto file without index numbers
  # Nine lines of code

def findRepeatedNameSongs(threshold, outputfile): # Repeat names
  allNames = pd.read_csv("allNames.csv", sep="\t") # Opens csv of songs
  colNames = ["artist","song","name"] # Establishes columns
  subset = allNames[colNames]
  subset = subset.groupby(["artist","song","name"]).size().reset_index(name="times") # Groups a name from a particular song into one variable to be counted for
  subset = subset[["name","times","artist","song"]] # Rearranges columns
  test = subset.sort_values(["times"], ascending=[False]) # Sorts descending 
  out = test.loc[test["times"] >= threshold] # Gathers data according to threshold
  out.to_csv(outputfile, sep=',', index=False) # Writes data onto csv
  # Eight lines of code

def countNameDecades(name, outputfile): # Timeless names
  allNames = pd.read_csv("allNames.csv",sep="\t")
  colNames = ["artist","song","year","name"]
  subset = allNames[colNames]
  subset = subset.drop_duplicates()
  subset = subset.loc[subset["name"] == name]
  above70 = subset[subset["year"].isin(range(1970,1980))]
  above70 = len(above70)
  above80 = subset[subset["year"].isin(range(1980,1990))]
  above80 = len(above80)
  above90 = subset[subset["year"].isin(range(1990,2000))]
  above90 = len(above90)
  above00 = subset[subset["year"].isin(range(2000,2010))]
  above00 = len(above00)
  above10 = subset[subset["year"].isin(range(2010,2020))]
  above10 = len(above10)
  out = pd.DataFrame({"Number":[above70,above80,above90,above00,above10],"Decade":[1970,1980,1990,2000,2010]})
  out.to_csv(outputfile, sep='\t', index=False) 
 # Seventeen lines of code

def countStartLetter(outputfile): # Lettering, first letter
  allNames = pd.read_csv("allNames.csv", sep="\t")  # Reads csv
  onlyNames = pd.read_csv("onlyNames.csv", sep=",", names = ["names", "number"]) 
  colNames = ["artist","song","name"]
  subset = allNames[colNames]
  subset = subset.drop_duplicates() 
  
  first_letter = onlyNames.groupby(onlyNames['names'].str[0]).sum(numeric_only=True) # Groups by first letter and counts the amount
  total_sum = onlyNames["number"].sum() # Gets total sum of names in the US since 1950
  first_letter["number"] = first_letter["number"].divide(total_sum) 
  first_letter["number"] = first_letter["number"].multiply(100) # Makes it into a percentage value
  
  song_letter = subset
  song_letter["names"] = subset["name"].str[0] # Gets first letter
  song_table = song_letter.groupby(by="names",as_index=False).count() # Counts the amount
  song_table.rename(columns = {"artist" : "number"},inplace=True)
  song_table["frequency"] = song_table["number"]/song_table["number"].sum()*100 
  song_table = song_table[["names", "frequency"]] # Simplifies data

  allFreq = pd.merge(song_table, first_letter,how="inner", on="names") # Merges data
  allFreq.rename(columns = {"frequency" : "names_freq", "number" : "songs_freq"},inplace=True) # Renames columns
  allFreq["difference"] = allFreq["names_freq"] - allFreq["songs_freq"] # Gets the proporation to each other
  out = allFreq[["names", "difference"]] # Simplifies data
  out = out.rename(columns = {"names" : "letter", "difference" : "proporation"})
  out.to_csv(outputfile, sep='\t', index=False) # Outputs the file
  # Twenty one lines of code

def countEndLetter(outputfile): # Lettering, last letter
  allNames = pd.read_csv("allNames.csv", sep="\t") # Reads csv
  onlyNames = pd.read_csv("onlyNames.csv", sep=",", names = ["names", "number"])
  colNames = ["artist","song","name"]
  subset = allNames[colNames] # Makes subset of instances of names in songs
  subset = subset.drop_duplicates() 
  
  first_letter = onlyNames.groupby(onlyNames['names'].str[-1]).sum(numeric_only=True) # Creates a group of last letters and their instances
  total_sum = onlyNames["number"].sum() # Gets the sum of instances of names
  first_letter["number"] = first_letter["number"].divide(total_sum)
  first_letter["number"] = first_letter["number"].multiply(100) # Makes it into a percantage value
  
  song_letter = subset
  song_letter["names"] = subset["name"].str[-1] # Gets the last letter of a name in stances of songs
  song_table = song_letter.groupby(by="names",as_index=False).count() # Counts the instances of a letter 
  song_table.rename(columns = {"artist" : "number"},inplace=True)
  song_table["frequency"] = song_table["number"]/song_table["number"].sum()*100
  song_table = song_table[["names", "frequency"]] # Simplifies the data

  allFreq = pd.merge(song_table, first_letter,how="inner", on="names") # Merges data
  allFreq.rename(columns = {"frequency" : "names_freq", "number" : "songs_freq"},inplace=True)
  allFreq["difference"] = allFreq["names_freq"] - allFreq["songs_freq"] # Gets porportional data
  out = allFreq[["names", "difference"]] # Simplifies data
  out = out.rename(columns = {"names" : "letter", "difference" : "proporation"}) # Renames columns
  out.to_csv(outputfile, sep='\t', index=False) # Outputs csv
  # Twenty one lines of code
  
def main(): # Tests
  findName("Jack","tests/jack.csv")
  findName("Peter","tests/peter.csv")
  findName("Mary","tests/mary.csv")
  findUniqueNameSongs(15, "tests/unique.15.csv")
  findUniqueNameSongs(20, "tests/unique.20.csv")
  findRepeatedNameSongs(20, "tests/repeat.20.csv")
  findRepeatedNameSongs(30, "tests/repeat.30.csv")
  findRepeatedNameSongs(40, "tests/repeat.40.csv")
  countNameDecades("Mary", "tests/mary.decades.csv")
  countNameDecades("Joe", "tests/joe.decades.csv")
  countNameDecades("Madison", "tests/madison.decades.csv")
  countNameDecades("Abby", "tests/abby.decades.csv")
  countStartLetter("tests/names.start.csv")
  countEndLetter("tests/names.end.csv")
  
main() # Main function
