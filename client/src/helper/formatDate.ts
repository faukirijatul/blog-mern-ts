export const formatDate = (isoString : string) => {
    const date = new Date(isoString);
  
    const day = date.getDate();
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", 
      "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear(); 
  
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
  
    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  };