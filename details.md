## Next.JS , React and Tailwind CSS
All three of these technologies are totally new to me, so after reading a lot of docs, watching a lot of youtube videos and experimenting, I think this is the best I could do with my current understanding of these technologies.
I wanted to try to follow the guidelines of NextJS as much as I could but that documentation is a bit unclear and confusing at times. I still don't have a complete understanding of all the use cases of react hooks, and I still need to learn some more fundamental rules and behaviours of React. 

The CSS work isn't the best, as Tailwind CSS has so many classes, but I feel that it is a very refreshing and a very different way of writing modern CSS. The application should be fairly responsive since I used the preset breakpoints of Tailwind CSS. 

## Bugs
There is a bug in the /posts/[id]/edit route due to the searchParams prop becoming empty{} during production. This issue is being addressed here https://github.com/vercel/next.js/issues/43077 but the possible solutions given here did not work for me. I wanted this component to be a Server component since there is minimal interactivity required, so i wanted to explore the server actions feature of nextjs 13.

## Improvements
I decided to add pagination since, i felt it would look better just to show posts 10 at a time. More improvements would be to show the creation and last updated time, adding authentication, and authentication based editing of the posts. Also, filters based on authors and sort could be added on the client side. I would like to experiment more with caching and see how much can API calls be reduced. 

