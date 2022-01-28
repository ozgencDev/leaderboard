# Backend

The user makes a request with id, what will return is the first 100 people and the people around him. Database query is not thrown for the first 100 people, because with cron job, our server keeps our redis cache constantly updated, only the people around it are queryed and the rank is returned in a calculated way. **(node-cron,ioredis,redis-rank,mongoose)**
![ Display Text ](http://www.borakasmer.com/wp-content/uploads/2019/11/algorithm-basic.png)

In addition, if the user wins the score, 2% of this score is added to the prize pool. A cron job is used in this job. The desired time can be set and the prize can be distributed. After the prize is distributed, the prize pool is reset. **(node-cron,axios)**

Request to play routes to see distribution in bounty pool. **(axios,jest)**

## Projeyi başlatmak için

- npm start

## Kullancıların skor kazanması için

- npm test
