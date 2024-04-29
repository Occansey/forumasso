from iqoptionapi.stable_api import IQ_Option
import time
from threading import local,Semaphore,Thread
def authentication():
    username = "maxdinton@gmail.com"  ###Very bad practice
    password = "Maxwell78"  # Very bad practice
    API = IQ_Option(username, password)
    check, reason = API.connect()
    print(f"Succesfuly logged in {username.split('@')[0]}") if check else print(
        f"Credentials Error {reason}"
    ) and quit()
    return API

def buy_sell_asset(API,action,currency,amount,num):
    order_action, id_action=API.buy_digital_spot (currency, amount, action,1) #command to put in an order to sell on the currency_target
    string="{:.2f}".format(amount)
    print ('Failure ',id_action) if not order_action else print (f"You just {'bought'if action=='call' else 'sold'} {string}$ on {currency} at {time.ctime().split()[3]} Thread {num}")
    if not order_action : quit()
    return order_action,id_action

              
    
def daenerys(candles):
    API=authentication() 
    print('Balance',API.get_balance(),'$','Trading beginning on',time.ctime())
    class ThreadSpecificData:
        def __init__(self):
            self.i = 0
            self.amount = 1
            self.action = None
            self.id_action = None
            self.win_action=0
            self.check_action=False 
            self.num=None
            self.juice=False

    def targaryen(API, candles, num,sem):
        sem.acquire()
        try:
            thread_data = local()
            thread_data.data =ThreadSpecificData()
            buy='call' 
            sell='put'
            pattern_length=len(candles)
            currency='EURGBP'
            thread_data.data.num=num
            order_action, thread_data.data.id_action = buy_sell_asset(API, buy if candles[0] else sell, currency,1,thread_data.data.num)
        finally:
            sem.release()
        while True :
            sem.acquire()
            try:
                if  time.time()%60 <10: 
                    thread_data.data.check_action, thread_data.data.win_action=API.check_win_digital_v2(thread_data.data.id_action)
                    if thread_data.data.check_action:
                        w_n=thread_data.data.win_action
                        thread_data.data.i+=1 
                        loser=w_n<0
                        print(f"{round(abs(w_n),2)}$ {'loss' if loser else 'profit'}  THREAD {num} ")
                        if loser :return
                        if thread_data.data.i>=pattern_length:
                            print('success',candles,f'{time.ctime().split()[3]}')
                            return
                        thread_data.data.action=buy if candles[thread_data.data.i] else sell
                        thread_data.data.amount+= w_n
                        order_action, thread_data.data.id_action=buy_sell_asset(API, thread_data.data.action, currency,thread_data.data.amount,num)
                        thread_data.data.juice=True
                        sem.release() and time.sleep(45)
            finally:
                thread_data.data.juice=False if thread_data.data.juice else sem.release()   

    time_ready=True
    i=0
    api_sem = Semaphore(value=1)  
    while True :
        timer=time.time()%60
        if timer>59 and time_ready:
            Thread(target=targaryen,args=(API, candles,i,api_sem)).start()
            time_ready=False
            i+=1
            time.sleep(57)         
        if timer>2 : time_ready=True
      
         
daenerys([0, 1, 1, 0, 1, 0, 0, 1, 0])