problems = set()
with open('in') as f:
    lines = f.readlines()

for line in lines:
    line = line[:-1]
    # print (line)
    problems.add(line)

out = open('case', 'w')
for key in problems:
    out.write(''.join("case '%s':\n  addUniqueBadgeByKey('%s', student, ps.time);\n  break;\n" % (key, key)))
out.close()

out = open('array', 'w')
out.write('[ ')
i = 1
for key in problems:
    if(i % 3 == 0):
        out.write('\n')
    out.write('\'' + key + '\'' + ", ")
out.write(' ]')
out.close()
