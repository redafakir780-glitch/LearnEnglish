# LearnEnglish

مشروع Expo (React Native) لتطبيق "تعلم الإنجليزية" — نسخة أولية (MVP).

الملفات المضمنة:
- App.js: التطبيق الرئيسي مع شاشات أساسية (الرئيسية، الدورات، الدرس، التمرين، البطاقات).
- app.json: إعدادات Expo مع package id الافتراضي com.learnenglish.app.
- eas.json: إعدادات EAS للبناء (AAB).
- firebaseConfig.example.js: ملف إعداد Firebase كمثال (استبدل القيم بملفك).

إعداد وتشغيل محلياً:
1. ثبت Node.js و npm.
2. ثبت Expo CLI و EAS CLI: 
   npm install -g expo-cli
   npm install -g eas-cli
3. ثبت التبعيات:
   npm install
4. شغّل المشروع (محلياً):
   npm run start
   أو افتح Expo Go على هاتفك ومسح كود QR.

إضافة Firebase (Android):
- انشئ مشروع في Firebase Console.
- حمّل ملف google-services.json من إعدادات المشروع > Android app.
- ضع google-services.json في مجلد android/ (عند استخدام bare workflow) أو ضمن جذر المشروع واتبع تعليمات Expo Firebase إذا لزم.
- استبدل محتويات firebaseConfig.example.js وأعد تسميته firebaseConfig.js.

بناء AAB للإصدار الإنتاجي (EAS):
1. سجّل دخولك إلى Expo: eas login
2. اربط المشروع: eas build:configure
3. ابدأ البناء:
   eas build -p android --profile production

رفع تلقائي إلى Google Play (اختياري):
- أنشئ Service Account في Google Play Console (API access) وحمّل ملف JSON للمفتاح.
- استخدم الأمر التالي لرفع الإصدار تلقائياً بعد البناء:
   eas submit -p android --latest --service-account-json ./service-account.json

ملاحظات أمنية:
- لا ترفع google-services.json أو service-account.json إلى مستودعات عامة. احتفظ بها محلياً أو في سر مخفي.

إذا أردت: استطيع متابعة بناء AAB ورفعه نيابةً عنك إذا أرسلت ملف service-account.json هنا (أو عبر قناة آمنة). حالياً سأدفع الملفات للمستودع الذي تزوده.
