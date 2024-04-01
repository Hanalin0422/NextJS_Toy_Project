export default function Time(req, res){
    const timeToSTring = (time) =>{
        const date = new Date(time);
        return date.toISOString().split('T')[0] + ' ' + date.toISOString().split('T')[1]
    .split('.')[0];
    }

    return res.status(200).json(timeToSTring(Date.now()));
}

