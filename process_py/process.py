import re

def find_diff(member_path,attend_path,phone_path):
    attends = {}
    phones = []
    members = {}
    with open(member_path) as f:
        for line in f:
            if line:
                line = line.strip()
                members[line]=0
    with open(attend_path) as f:
        i = 0
        for line in f:
            if line:
                line = line.strip()
                attends[line]=phones[i]
                i+=1
    with open(phone_path) as f:
        for line in f:
            if line:
                line = line.strip()
                phones.append(line)
    if not phones:
        phones = ['' for _ in attends]
    not_in_members = [] # 需要拉进群 
    not_in_attends = [] # 需要改名字的人
    for name in attends.keys():
        hit = False
        for m in members:
            if name in m:
                members[m]+=1
                hit = True
                break
        if hit == False:
            not_in_members.append(name+'\t'+attends[name])
    for m in members.keys():
        if members[m]<=0:
            not_in_attends.append(m)
    with open('results.txt','w') as f:
        f.write('####需要拉进群的人\n')
        f.write('\n'.join(not_in_members))
        f.write('\n\n\n####需要改名字的人\n')
        f.write('\n'.join(not_in_attends))



if __name__ == '__main__':
    member_path = '../members.txt'
    attend_path = 'attend.txt'
    phone_path = 'phones.txt'
    find_diff(member_path, attend_path,phone_path)
