export const getFileFromBase64 = (str: string, fileName: string, mimeType = 'image/jpeg') => {
  const byteString = atob(str);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([uint8Array], { type: mimeType });

  return new File([blob], fileName, { type: mimeType });
};
