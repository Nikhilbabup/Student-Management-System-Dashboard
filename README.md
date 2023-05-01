# Student-Management-System-Dashboard

### Install Node version

More information on how to install NVM: https://github.com/nvm-sh/nvm

### Install NVM on Ubuntu

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

<br>

This will install the nvm script to your user account. To use it, you must first source your bashrc file:

```bash
source ~/.bashrc
```

<br>

## After Installing NVM run the following command on project's root Directory If you are using Linux

```bash
nvm install
nvm use
```

### Install Dependencies

```bash
npm install
```

### Install Mongodb on your system

follow this link to install Mongodb on your system https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/

### To run this DashBoard

```bash
npm run start
```

## User credential details to login to the Dashboard

Username : PeterParker
Password : edith

## You can obtain a Slack API token by following these steps:

1.  Go to the Slack API website and log in to your Slack workspace.<br>
    https://api.slack.com/

2.  Navigate to the "Create a new app" page.

3.  Give your app a name and select the workspace you want to use it in.

4.  Click the "Create App" button.

5.  Add App name and Pick a workspace to develop your app in and click Create APP.

6.  On the "Add features and functionality" page, click the "Incoming Webhooks" option.

7.  Turn on Activate Incoming Webhooks.

8.  On the "Install your app" page, Click Install to Workspace

9.  On Incoming Webhooks we can add webhook to channel and copy the URL

10. Create 2 channels in slack an add webhooks to that channel

11. Copy that urls and paste it on app.js file 261 and 271 lines I have added comments in that section
