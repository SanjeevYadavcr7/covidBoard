export const sortData = (data) => {

    const sortedData = [...data];
    sortedData.sort((a,b) => {
        if(a.cases > b.cases){
            return -1;
        }
        else{ return 1;}
    })
    return sortedData;
}

export const getMinDate = () => {
    const date = new Date();
    return date.toISOString().slice(0, 10);
  };
  
export const getMaxDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    return date.toISOString().slice(0, 10);
  };