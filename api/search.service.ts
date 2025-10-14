const hasher = require('node-object-hash')({enc: 'hex', alg: 'sha256', trim: false, coerce:false})

export const searchPrograms = (
  terms: string, 
  location: {zipCode: number, radius: number}, 
  indexNumber: number,
  indexPage: number,set up 
 ): Promise<{hasMore: boolean, results: []} => {
  const query = {
    terms: terms,
    pageIndex: indexPage - 1,
    pageSize: indexNumber,
    zipCode: location.zipCode,
    radius: location.radius,
  }
  const searchHash = `${hasher.hash(JSON.stringify(query))}|${Date.now()}`
 }