# Enclave

## Specification

Enclave provides a specification allowing individuals to control and share personal information online in a standardized format. A individual will specify which information they would like to be made available in a yaml file. The location of the yaml file should be at `/keybase/public/<username>/.enclave/enclave.yaml`.

If an individual would like to share information with a specific organization or platform they should put the file in `/keybase/private/<username>#<organization_name>/.enclave/enclave.yaml`

`username`: The handle the user's identity and actions will be preformed behind.

`full_name`: The full name of the user

`email`: The email address of the user

`profile_image_url`: The url of a profile image associated with the user.

`resume`: A link to a resume of the user

`credit_card_number`: Credit card number

`credit_card_expiry`: Expiration date of the credit card. Format is YYYY-MM-DD

`credit_card_csv`: Three digit code on back of card

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
credit_card_number: 4512-1231-1236-7892
credit_card_expiry: 2021-06-17
credit_card_csv: 126
```

## Profiles

An individual may have several online personas. Enclave allows the individual to have multiple enclave profiles. The user can seperate thier information by namespacing their enclave.yaml file under a folder. For example the user may have a gaming profile and a professional profile. They would organize thier enclave.yaml files in the following fasion.

### Example of two profiles

Located at /keybase/public/nick.tesla/**gaming**/.enclave/enclave.yaml

```yaml
username: Gamerguy123
email: gamingguy1234@gmail.com
profile_image_url: https://coolgamerwebsite/gamerguy123/pic.jpg
```

Located at /keybase/public/nick.tesla/**professional**/.enclave/enclave.yaml

```yaml
username: NickolaTesla
email: Nickola@teslaresearch.com
phone_number: 416-678-9824
resume: https://resumehoster.com/nick/resume.pdf
```

## Groups

An individual may want to group various common entities together for easier management of their data. For example, one could group their banks together and be able to modify their mailing address, email, phone number, etc for all banks at once.

Group configs must be stored in this location: `/keybase/private/<user>/.enclave/groups.yaml`

### Example group config

```yaml
bank:
  - TD
  - BMO
  - RBC
shopping:
  - BestBuy
  - Amazon
```
