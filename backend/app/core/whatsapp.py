from twilio.rest import Client
import os

account_sid = "YOUR_TWILIO_SID"
auth_token = "YOUR_TWILIO_AUTH_TOKEN"
from_whatsapp = "whatsapp:+14155238886"

client = Client(account_sid, auth_token)

def send_whatsapp(to_number: str, message: str):
    client.messages.create(
        from_=from_whatsapp,
        body=message,
        to=f"whatsapp:{to_number}"
    )
