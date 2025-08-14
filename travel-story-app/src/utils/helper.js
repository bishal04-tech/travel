export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export const getInitials = (name) => {
  if (!name) return '';
  const names = name.split(' ');
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  return names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase();
}

export const getEmptyCardMessage=(filterType)=>{
  switch(filterType){
    case  "search":
        return `Oops! No stories found matching your search`

     case "date":
      return `No stories found in the given date range`

      default:
        return `Start Creating your first Travel Story! Click the 'Add' button to drop down your thoughts,ideas and memories.Let's get started`;
  }
}