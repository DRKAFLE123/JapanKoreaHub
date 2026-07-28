import json
import re
import sys
import docx

sys.stdout.reconfigure(encoding='utf-8')

with open("scratch/docx_lessons_13_20.json", "r", encoding="utf-8") as f:
    docx_data = json.load(f)

# Helper function to generate clean Nepali translations for grammar rules & examples
def get_grammar_nepali_explanation(title, eng_exp):
    eng_lower = eng_exp.lower()
    if "desire to possess" in eng_lower or "ほしい" in title:
        return "N が ほしいです ले कुनै भौतिक वस्तुको चाहना ('मलाई... चाहिएको छ') व्यक्त गर्दछ।"
    elif "たいです" in title or "want to do" in eng_lower:
        return "Verb ます-stem + たいです ले कुनै कार्य गर्ने इच्छा ('गर्न चाहन्छु') व्यक्त गर्दछ।"
    elif "目的" in title or "purpose of movement" in eng_lower:
        return "V(ます-stem) / N に 行きます/来ます ले जानु वा आउनुको उद्देश्य ('गर्नका लागि जानु') जनाउँछ।"
    elif "te-formください" in title or "please do" in eng_lower or "にいて ください" in title:
        return "Vて ください ले कृपया केही गर्न अनुरोध वा निर्देशन दिँदा प्रयोग गरिन्छ।"
    elif "te-form います" in title or "progressive" in eng_lower:
        return "Vて います ले हाल भइरहेको कार्य (निरन्तर वर्तमान) वा कार्यको नतिजाको स्थिति जनाउँछ।"
    elif "ましょうか" in title or "offer" in eng_lower:
        return "Vましょうか ले सुन्ने व्यक्तिका लागि मद्दत वा कार्य गर्ने प्रस्ताव गर्दा प्रयोग गरिन्छ।"
    elif "も いいです" in title or "permission" in eng_lower:
        return "Vて もいいです ले कुनै काम गर्ने अनुमति ('गरे हुन्छ') व्यक्त गर्दछ।"
    elif "は いけません" in title or "prohibition" in eng_lower:
        return "Vて は いけません ले कडा मनाही ('गर्नु हुँदैन') व्यक्त गर्दछ।"
    elif "ないで ください" in title or "don't do" in eng_lower:
        return "Vないで ください ले कृपया कुनै काम नगर्न अनुरोध ('नगर्नुहोस्') गर्दा प्रयोग गरिन्छ।"
    elif "なければ なりません" in title or "must do" in eng_lower:
        return "Vなければ なりません ले अनिवार्य रूपमा गर्नुपर्ने दायित्व ('गर्नै पर्छ') व्यक्त गर्दछ।"
    elif "なくても いいです" in title or "don't have to" in eng_lower:
        return "Vなくても いいです ले कुनै काम नगरे पनि हुने ('नगरे पनि हुन्छ') छुट जनाउँछ।"
    elif "こと が できます" in title or "can do" in eng_lower:
        return "N / V(dictionary form) ことが できます ले क्षमता वा सम्भावना ('गर्न सक्नु') व्यक्त गर्दछ।"
    elif "しゅみは" in title or "hobby" in eng_lower:
        return "わたしの しゅみは V(dictionary form) ことです ले आफ्नो रुचि/हबी स्पष्ट रूपमा व्यक्त गर्दछ।"
    elif "まえに" in title or "before" in eng_lower:
        return "V(dictionary form) / Nの まえに ले कुनै कार्य गर्नुअघि ('गर्नुअघि') अर्को कार्य हुनु जनाउँछ।"
    elif "ことが あります" in title or "experience" in eng_lower:
        return "Vた ことがあります ले विगतको व्यक्तिगत अनुभव ('पहिले गरेको छु') व्यक्त गर्दछ।"
    elif "たり" in title or "such things as" in eng_lower:
        return "Vた り、Vた り します ले विभिन्न कार्यहरू उदाहरणीय रूपमा सूचीबद्ध गर्दा प्रयोग गरिन्छ।"
    elif "になります" in title or "become" in eng_lower:
        return "い-adj(く) / な-adj(に) / N(に) なります ले स्थितिमा परिवर्तन ('हुनु / बन्नु') जनाउँछ।"
    elif "plain style" in eng_lower or "普通体" in title:
        return "जापानी भाषामा दुई शैली हुन्छन्: नम्र शैली (です/ます) र साधारण शैली (普通体 - साथी र परिवारका बीच)।"
    return f"{eng_exp} (नेपाली व्याख्या)"

def get_example_nepali(jp, eng):
    eng_lower = eng.lower().strip()
    if "i want a friend" in eng_lower:
        return "मलाई साथी चाहिएको छ।"
    elif "i want a new car" in eng_lower:
        return "मलाई नयाँ कार चाहिएको छ।"
    elif "i want to go to japan" in eng_lower:
        return "म जापान जान चाहन्छु।"
    elif "i want to eat" in eng_lower:
        return "म मःम खान चाहन्छु।"
    elif "buy a book" in eng_lower:
        return "म किताब किनेर पढ्छु।"
    elif "please write your name" in eng_lower:
        return "कृपया यहाँ आफ्नो नाम लेख्नुहोस्।"
    elif "raining" in eng_lower:
        return "अहिले पानी परिरहेको छ।"
    elif "may i take a photo" in eng_lower:
        return "के म फोटो खिच्न सक्छु?"
    elif "must not smoke" in eng_lower or "must not" in eng_lower:
        return "यहाँ धुम्रपान गर्नु हुँदैन।"
    elif "married" in eng_lower:
        return "म विवाहित हुँ।"
    elif "i know" in eng_lower:
        return "म तानाका-जीलाई चिन्छु।"
    elif "live in osaka" in eng_lower:
        return "म ओसाकामा बस्छु।"
    elif "young and lively" in eng_lower:
        return "मिलर-जी जवान र ऊर्जावान हुनुहुन्छ।"
    elif "please don't worry" in eng_lower:
        return "कृपया चिन्ता नगर्नुहोस्।"
    elif "must take medicine" in eng_lower:
        return "मलाई औषधि खानै पर्छ।"
    elif "can speak japanese" in eng_lower:
        return "मिलर-जी जापानी बोल्न सक्नुहुन्छ।"
    elif "my hobby is" in eng_lower:
        return "मेरो रुचि संगीत सुन्नु हो।"
    elif "ridden a horse" in eng_lower:
        return "म पहिले घोडा चढेको छु।"
    elif "clean my room" in eng_lower:
        return "आइतबार म कोठा सफा गर्ने, फिल्म हेर्ने गर्छु।"
    elif "becomes cold" in eng_lower:
        return "जाडो हुँदै जान्छ।"
    return f"{eng} (नेपाली)"

print("Grammar generators initialized!")
