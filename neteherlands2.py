#import ait
import time
import undetected_chromedriver as uc
#import seleniumwire.undetected_chromedriver as uc
from selenium.webdriver.support.ui import WebDriverWait,Select
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import TimeoutException
import atexit
import os
import time



    
def findSubElement(parent,by,value):
        try:
             element = parent.find_element(by=by,value=value)
             return element
        except NoSuchElementException:
            return None
def findElement(driver,by,value,timeout) -> WebElement:
    try:
        WebDriverWait(driver,timeout/1000).until(EC.presence_of_element_located((by,value)))
        elem = driver.find_element(by=by,value=value)
        return elem
    except NoSuchElementException:
        print("\tError finding xyz...")
        return None
    except TimeoutException:
        print("\tError finding xyz TimeoutException...")
        return None    

def waitLoader(driver):
    alertContainer = findElement(driver,By.TAG_NAME,"app-notification",300)
    if alertContainer != None:
        alert = findSubElement(alertContainer,By.CLASS_NAME,"c-brand-blue")
        if alert != None:
            print("ALERTT "+alert.text)
    
    loaderContainer = findElement(driver,By.TAG_NAME,"ngx-ui-loader",300)
    time.sleep(1)
    if loaderContainer == None:
        return
    openLoader = findSubElement(loaderContainer,By.TAG_NAME,"loading-foreground")
    closingLoader = findSubElement(loaderContainer,By.TAG_NAME,"foreground-foreground")
    if openLoader !=None or closingLoader !=None:
        waitLoader()
    

proxy_options1 = {
    'proxy': {
        'http': 'http://feritzcan:329f8c-c15bc4-4d6eba-416f57-6ee70e@global.rotating.proxyrack.net:9000',
        'https': 'https://feritzcan:329f8c-c15bc4-4d6eba-416f57-6ee70e@global.rotating.proxyrack.net:9000'
    }
}
proxy_options = {
    'proxy': {
        'http': 'http://feritzcan:329f8c-c15bc4-4d6eba-416f57-6ee70e@private.residential.proxyrack.net:10000',
        'https': 'https://feritzcan:329f8c-c15bc4-4d6eba-416f57-6ee70e@private.residential.proxyrack.net:10000'
    }
}
# chrome_options = Options()
# current_directory =os.path.join(os.getcwd(), "ChromeExtensions") 
# #chrome_options.add_argument('--ignore-ssl-errors=yes')
# #chrome_options.add_argument('--ignore-certificate-errors')
# chrome_options.add_argument("--load-extension="+os.path.join(current_directory, "anycaptcha")+","+os.path.join(current_directory, "2.0.1_0"))

#driver = uc.Chrome(
#    options=chrome_options,
#    seleniumwire_options=proxy_options
#)
#driver.implicitly_wait(5)
while True:
    chrome_options = Options()
    current_directory =os.path.join(os.getcwd(), "ChromeExtensions") 
    #chrome_options.add_argument('--ignore-ssl-errors=yes')
    #chrome_options.add_argument('--ignore-certificate-errors')
    chrome_options.add_argument("force-device-scale-factor=0.5");
    chrome_options.add_argument("high-dpi-support=0.5");
    chrome_options.add_argument("--load-extension=C:\\ConsoleApp\\ChromeExtensions\\2.0.1_0")
    
    driver = uc.Chrome(options=chrome_options,driver_executable_path=r"C:\Users\Feritzcan\Desktop\Projects\Ferit\RandevuTracker\RandevuTracker\WorkerDistribution.SeleniumWorker\Util\Driver")
    driver.execute_script("document.body.style.zoom='50%'")
    try:
        driver.get("https://visa.vfsglobal.com/tur/en/nld/login")
        driver.implicitly_wait(5)
        time.sleep(25)
        

        waitLoader(driver)
        mail = findElement(driver,By.ID,"mat-input-0",5000)  
        mail.send_keys("kavybirticq@hotmail.com")
        mail = findElement(driver,By.ID,"mat-input-1",5000)  
        mail.send_keys("4!SEoQFokNKq")
        cookie= findElement(driver,By.ID,"onetrust-accept-btn-handler",5000)
        if cookie is not None:
            cookie.click()
        statusText = "Solving is in process..."
        while statusText == "Solving is in process...":
            captchaContainer = findElement(driver,By.TAG_NAME,"app-captcha-container",3000)
            if (driver.page_source.find('Mandatory field cannot be left blank')>-1):
                break
            if captchaContainer !=None:
                status = findSubElement(captchaContainer,By.CLASS_NAME,"status")
                if status != None:
                    statusText = status.text
            time.sleep(1) 
        
        if statusText != "Solved":
            print("Captcha not solvd "+statusText)

        button = findElement(driver,By.CLASS_NAME,"btn-brand-orange",5000)  
        button.click()
        waitLoader(driver)

        buttonContainer = findElement(driver,By.CLASS_NAME,"position-relative",5000)  
        findSubElement(buttonContainer,By.CLASS_NAME,"mat-btn-lg").click()
        waitLoader(driver)
        
        def checkSessionEnd(driver):
                select = findElement(driver,By.ID,"mat-select-2",1000)
                if select == None: print("session end")
                subElmnt = findSubElement(select,By.CLASS_NAME,"mat-select-min-line")
                if subElmnt == None: print("session end")
                if subElmnt.text == None or subElmnt.text == "": print("session end")

        
        try:
            firstOption = True
            while True:
                if firstOption == True:firstOption=False
                else: firstOption = True
                #print('1')
                findElement(driver,By.ID,"mat-select-0",1000).click()
                #print('2')
                
                waitLoader(driver)
                if firstOption == True:
                   findElement(driver,By.ID,"mat-option-7",1000).click()
                else:
                   findElement(driver,By.ID,"mat-option-8",1000).click()
                #print('3')
                waitLoader(driver)
                
                #print('4')
                checkSessionEnd(driver)
                findElement(driver,By.ID,"mat-select-4",1000).click()
                waitLoader(driver)
                
                #print('5')
                elements = driver.find_elements(by=By.TAG_NAME,value="mat-option")
                clicked=False
                for key in elements:
                    textElement = key.find_element(By.CLASS_NAME,"mat-option-text")
                    elementText = textElement.text.strip()
                    if elementText == "TURIZM VIZE BASVURUSU / TOURISM VISA APPLICATION".strip():
                        clicked=True
                        key.click()
                #print('6')
                if clicked == False: print("session end")
                waitLoader(driver)
                
                checkSessionEnd(driver)

                date = findElement(driver,By.CLASS_NAME,"alert-info",1000)
                if date != None:
                    print("Date "+date.text)
                #print('7')
        except Exception as e:
            #print('156')
            #print(e)
            try:
                driver.close()
                driver.quit()
            except Exception as e:
                print('170')
                print(e)
    except Exception as e:
        #print('159')
        #print(e)
        try:
            driver.close()
            driver.quit()
        except Exception as e:
            print('165')
            print(e)


time.sleep(3222) 