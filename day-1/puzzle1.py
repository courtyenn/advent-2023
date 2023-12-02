import os
def findNumber(line, reverse):
  num = 0
  start = 0
  stop = len(line)
  inc = 1
  if reverse:
    start = len(line)-1
    stop = -1
    inc = -1
  for i in range(start, stop, inc):
    if line[i].isnumeric():
      num = line[i]
      break;
  return str(num)
  
  file1 = open('myfile.txt', 'w')

file2 = open('./day-1/output.txt', 'w')
file1 = open('./day-1/input.txt', 'r')
Lines = file1.readlines()
 
count = 0
total = 0
# Strips the newline character
for l in Lines:
    line = l.strip()
    count+=1
    a = findNumber(line, False)
    b = findNumber(line, True)
    c = a + b;
    file2.writelines("{}: {} + {} = {}\n".format(line, total, c, total + int(c)))
    total = total + int(c)
    

file2.close()