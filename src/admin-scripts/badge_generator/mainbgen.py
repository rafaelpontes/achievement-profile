#coding: utf-8
problems = set()
with open('in') as f:
    lines = f.readlines()

for line in lines:
    line = line[:-1]
    # print (line)
    problems.add(line)

out = open('mainArray', 'w')
out.write('[ ')
i = 1
for key in problems:
    if key == "pi_por_aproximacoes":
        out.write('{\n\tkey: "' + key + '",')
        out.write('\n\ttitle: "Aproximador Profissional!",')
        out.write('\n\tdescription: "Resolveu a questão de pi por aproximação.\",')
        out.write('\n\timgsrc: "./images/badges/extras/pi/pi-aprox.png",')
        out.write('\n\tcumulative: false,')
        out.write('\n\tachieved: false')
        out.write('\n},\n\n')
    else:
        out.write('{\n\tkey: "' + key + '",')
        out.write('\n\ttitle: "' + key.replace('_', ' ').title() + '!",')
        out.write('\n\tdescription: "Resolveu a questão \'' + key.replace('_', ' ').title() + '\'.\",')
        out.write('\n\timgsrc: "./images/badges/noimage.png",')
        out.write('\n\tcumulative: false,')
        out.write('\n\tachieved: false')
        out.write('\n},\n\n')

out.write(' ]')
out.close()
