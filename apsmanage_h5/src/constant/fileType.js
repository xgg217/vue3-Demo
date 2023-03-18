export const xlsAccept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
export const docAccept="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
export const pdfAccept="application/pdf"//.pdf
export const csvAccept=".csv"//.csv
export const imagesAccept="image/*"//.image


export const otherFileType=[xlsAccept,imagesAccept,pdfAccept,docAccept]
//限制 n mb
export const fileLimit = (n) => {
  return 1024*1024*n
}
