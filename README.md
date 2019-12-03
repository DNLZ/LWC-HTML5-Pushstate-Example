# LWC History API Example
This example demonstrates how to make the browser's **Forward** and **Back** buttons work with a wizard built with LWC.

## Installation via SFDX

1. Create a scratch org:
```
sfdx force:org:create -s -f config/project-scratch-def.json -a lwc-history-example
```

2. Push the app to your scratch org:
```
sfdx force:source:push
```

2. Assign the **LWC History Example** permission set to the default user:
```
sfdx force:user:permset:assign -n LWC_History_Example
```

4. Open the scratch org:
```
sfdx force:org:open
```

5. In App Launcher, select the **LWC History Example** app.
