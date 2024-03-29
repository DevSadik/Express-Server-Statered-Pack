
import { Vonage } from '@vonage/server-sdk'

const vonage = new Vonage({
    apiKey: "12b07d70",
    apiSecret: "vq8X49Jn71EcJHZm"
    })

export const SendSms = () => {
    const from = "Vonage APIs"
    const to = "8801703085993"
    const text = 'Message sent successfully'
    
    async function sendSMS() {
        await vonage.sms.send({to, from, text})
            .then(resp => { console.log('Message sent successfully'); console.log(resp); })
            .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
    }

    sendSMS();
}