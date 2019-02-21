# Just a script to automate appending organization suffix to email
# You can create a file with list of logins and this will append the default institutional email sufix e.g.: example@institute.edu

suffix = "@institute.edu"
fname = 'logins.txt'

with open(fname) as f:

    content = f.readlines()
    content = [x.strip() for x in content]

    emails = []
    for x in content:
        s = '"'
        s += x
        s += '' + suffix + '",'
        emails.append(s)

    for x in emails:
        print x
