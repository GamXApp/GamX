const BASE_URL = '/api'

export async function getAllGames(){
    const response = await fetch(`${BASE_URL}/games`)
    return parseJsonResponse(response, 'No se pudieron cargar los juegos.')
}

export async function getGameById(id){
    const response = await fetch(`${BASE_URL}/game?id=${id}`)

    return parseJsonResponse(response, 'No se pudo cargar la información del juego.')
}

export async function filterGames({platform, category, sort} = {}){
    const params = new URLSearchParams()

    if(platform) params.append('platform', platform)
    if(category) params.append('category', category)    
    if(sort) params.append('sort-by', sort)

    const response = await fetch(`${BASE_URL}/games?${params.toString()}`)
    
    return parseJsonResponse(response, 'No se pudieron cargar los juegos filtrados.')
}

async function parseJsonResponse(response, fallbackMessage) {
    if (!response.ok) {
        throw new Error(fallbackMessage)
    }

    const text = await response.text()

    if (!text) {
        throw new Error(fallbackMessage)
    }

    try {
        return JSON.parse(text)
    } catch {
        throw new Error(fallbackMessage)
    }
}