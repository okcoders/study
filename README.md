# Study project

to help students see their progress

## developing

make sure you have a mongod running:

```
docker run --name study-mongodb -p 27017:27017 -d mongo
```

Make sure to npm install all the repos

```
npm run install-all
```

then from the root run: 

```
npm run dev
```