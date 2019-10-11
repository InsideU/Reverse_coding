from sys import stdin,stdout
mydict={1:'LB',2:'MB',3:'UB',4:'LB',5:'MB',6:'UB',7:'SU',0:'SL'}
mydict2={1:4,2:5,3:6,4:1,5:2,6:3,7:8,0:7}
T=int(stdin.readline())
while T>0:
    n=int(stdin.readline())
    y=n/8
    x=n//8
    if(x==y):
        x=x-1
    else:
        x=x
    z=n%8
    print(str(8*x+mydict2[z])+mydict[z])
    T=T-1
