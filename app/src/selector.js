export const getQuery = state => {
    let query = '';
    let concatType = '?';
    Object.entries(state.search).filter(([key, value]) => value !== '').forEach(([key, value]) => {
      query += `${concatType}${key}=${value}`;
      concatType = '&';
    });
    
    return query;
}