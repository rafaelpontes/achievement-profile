#coding: utf-8
problems = set()
with open('in') as f:
    lines = f.readlines()

for line in lines:
    line = line[:-1]
    # print (line)
    problems.add(line)

out = open('mainArray', 'w')
# out.write('[ ')
i = 1
for key in problems:
    if key == "pi_por_aproximacoes":
        out.write('\n\t\'' + key + '\': {')
        out.write('\n\t\ttitle: "Aproximador Profissional!",')
        out.write('\n\t\timgsrc: "./images/badges/extras/pi/pi-aprox.png"')
        out.write('\n\t},')
    else:
        out.write('\n\t\'' + key + '\': {')
        out.write('\n\t\ttitle: "' + key.replace('_', ' ').title() + '!",')
        out.write('\n\t\timgsrc: "./images/badges/noimage.png"')
        out.write('\n\t},')

# out.write(' ]')
out.close()
