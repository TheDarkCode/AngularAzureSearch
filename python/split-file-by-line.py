# Stack Overflow Credit: http://stackoverflow.com/questions/546508/how-can-i-split-a-file-in-python

splitLen = 1         # 1 line per file
outputBase = 'trail' # trail1.txt, trail2.txt, etc.

# This is shorthand and not friendly with memory
# on very large files (Sean Cavanagh), but it works.
input = open('trails.json', 'r').read().split('\n')

at = 1
for lines in range(0, len(input), splitLen):
    # First, get the list slice
    outputData = input[lines:lines+splitLen]

    # Now open the output file, join the new slice with newlines
    # and write it out. Then close the file.
    output = open(outputBase + str(at) + '.json', 'w')
    output.write('\n'.join(outputData))
    output.close()

    # Increment the counter
    at += 1
