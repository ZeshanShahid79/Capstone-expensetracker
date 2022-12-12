FROM openjdk:19

EXPOSE 8080

ADD backend/target/TravelEx.jar TravelEx.jar

CMD ["sh", "-c", "java -jar TravelEx.jar --spring.data.mongodb.uri=$MONGO_DB_URI"]
