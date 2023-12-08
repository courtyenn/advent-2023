import os
import re
regex = "(one|two|three|four|five|six|seven|eight|nine|[0-9])"
numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

def getNumber(wordOrNum):
  if wordOrNum.isnumeric():
    return wordOrNum
  else:
    return str(numbers.index(wordOrNum) + 1)
  
def parseString(line):
  matches = re.findall(regex,line)
  if len(matches) == 1:
    return [getNumber(matches[0]), getNumber(matches[0])]
  else:
    return [getNumber(matches[0]), getNumber(matches[len(matches) - 1])]

file2 = open('./day-1/output2.txt', 'w')
file1 = open('./day-1/input.txt', 'r')
Lines = file1.readlines()
 
count = 0
total = 0
# Strips the newline character
for l in Lines:
    line = l.strip()
    count+=1
    a, b = parseString(line)
    c = a + b;
    file2.writelines("{}: {} + {} = {}\n".format(line, total, c, total + int(c)))
    total = total + int(c)
    

file2.close()