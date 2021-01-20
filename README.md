# self-introduction-line-bot
A self introduction LINE bot, which is flexible to adding customize messages.

# Getting Started
## Installation
You can use npm or yarn as package manager.

```
git clone https://github.com/jinan-tw/self-introduction-line-bot.git
cd self-introduction-line-bot
```

Setup your configuration file
For Linux:
```
cd config
mv template.json menu.json
cd ..
```
For Command Prompt:
```
cd config
ren template.json menu.json
cd ..
```

Setup environment with `.env` in root folder
```
CHANNEL_ACCESS_TOKEN = {{YOUR CHANNEL ACCESS TOKEN}}
CHANNEL_SECRET = {{YOUR CHANNEL SECRET}}
TIME_ZONE = {{YOUR TIME ZONE}}
```

Then start project run with:
```
yarn install
yarn dev
```

For production, use:
```
yarn build
yarn start
```

## Configuration
Setup `menu.json` file under the project root folder `/config`.
You can edit `template.json` and rename it to `menu.json` when running the project.

### home
* Type: Message (for TypeScript types, see [types](https://github.com/line/line-bot-sdk-nodejs/blob/master/lib/types.ts).)
* Description: Welcome message in json format, refers to [Message objects](https://developers.line.biz/zh-hant/reference/messaging-api/#message-objects).

### back
* Type: String
* Description: The text which will trigger return event in navigation.

### homeOptions
* Type: Array
* Description: Options in welcome message, will clear all conversations when clicked.

### options
* Type: Object { [key: string]: Message }
* Description: Map for user's input.
