const post = [
    {id:1, post:"post1"},
    {id:2, post:"post2"},
    {id:3, post:"post3"},
    {id:4, post:"post4"},
    {id:5, post:"post5"},
    {id:6, post:"post6"},
    {id:7, post:"post7"},
    {id:8, post:"post8"},
    {id:9, post:"post9"},
    {id:10, post:"post10"},
    {id:11, post:"post11"},
]

// running our get request in this route
export async function GET(req){
    // here, we get our search parameters which is the page and limits
    const{searchParams} = new URL(req.url)
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    // here we do the calculations to get each page and limits
    const startsFrom  = (page-1)*limit;
    const endsAt = page*limit;
    // creating an object that will contain the numbers of page and the post
    const returnedObject = {}
    // here, we make use of slice to cut each path that we need by page
    returnedObject.valuetoReturn = post.slice(startsFrom,endsAt)
    returnedObject.totalLenght = post.length;
    // here we return the value to the users page
    return new Response(JSON.stringify(returnedObject), {status:200, statusText:"everything went well"})
}