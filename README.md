# Enclave

## Specification

Enclave provides a specification allowing individuals to control and share personal information online in a standardized format. A individual will specify which information they would like to be made available in a yaml file. The location of the yaml file should be at `/keybase/public/<username>/.enclave/enclave.yaml`. 

If an individual would like to share information with a specific organization or platform they should put the file in `/keybase/private/<username>#<organization_name>/.enclave/enclave.yaml `

`username`: The handle the user's identity and actions will be preformed behind.

`full_name`: The full name of the user

`email`: The email address of the user

`profile_image_url`: The url of a profile image associated with the user.

`credit_card`: An object containing credit card information. *Highly recommended to put  this in a Private Enclave*

`credit_card.card_number`: Credit card number

`credit_card.card_expiry`: Expiration date of the credit card. Format is YYYY-MM-DD

`credit_card.card_csv`: Three digit code on back of card 

### Example public enclave.yaml file
Located at /keybase/public/\<username>/.enclave/enclave.yaml
```yaml
username: AliceRox
full_name: Alice Bobation
email: alice1234@gmail.com
profile_image_url: /keybase/public/<username>/.enclave/profilepic.png
```
### Example private enclave.yaml file
Located at /keybase/private/\<username>#<oraganization_name>/.enclave/enclave.yaml
```yaml
username: AliceRox
email: alice1234@gmail.com
credit_card:
    card_number: 4512-1231-1236-7892
    card_expiry: 2021-06-17
    card_csv: 126
```


