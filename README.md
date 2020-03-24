# Backend for PT11 word-find app

This currently supports authentication endpoints and an (as yet) unrestricted database for users to add their own lists of words.

## Deployment details

There is no deployment as yet. That's on ya'll.

### Endpoint info:

The endpoints at `/auth/login` and `/auth/register` expect an object with the following format:

`
{
    username: ""
    password: ""
}
`

Both fields are required. Usernames must be unique.

The POST/PUT endpoints at /wordlists expect objects with the following format:

`
{
    user_id: 1 (this references an existing user's id)
    wordlist: "string,of,comma,separated,words"
    title: "descriptive title for wordlist"
}
`

PUT and DELETE operations should be restricted to only the user's own puzzles.

The POST/PUT/DELETE endpoints at /users will likely not be used and should be restricted from general users.