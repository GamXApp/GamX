const BASE_URL = '/api'

export async function getAllGames(){
    const response = await fetch(`${BASE_URL}/games`)
    const data = await response.json()
    return data
}

export async function getGameById(id){
    const response = await fetch(`${BASE_URL}/game?=id=${id}`)
    const data = await response.json()
    return data
}

export async function filterGames({platform, category, sort} = {}){
    const params = new URLSearchParams()

    if(platform) params.append('platform', platform)
    if(category) params.append('category', category)    
    if(sort) params.append('sort-by', sort)

    const response = await fetch(`${BASE_URL}/games?${params.toString()}`)
    const data = await response.json()
    return data
}
