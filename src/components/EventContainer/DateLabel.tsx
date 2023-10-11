import styled from "styled-components";

const Container = styled.div`
    display: flex;
`
const LabelCell = styled.div`
    width: 40px;
    height: 25px;
    margin: 0 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px
`

type Props = {
    startDate: string;
    endDate: string;
}

const formatDate = (dateString: Date) => {

    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const dayNames = [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
    ];

    const month = monthNames[dateString.getMonth()];
    const day = dateString.getDate();
    const dayOfWeek = dayNames[dateString.getDay()];

    return `${month} ${day} ${dayOfWeek}`;
}

const formatDateRange = (start: string, end: string) => {
    const dateRange = [];
    const currDate = new Date(start);

    while (currDate <= new Date(end)){
        dateRange.push(formatDate(currDate));
        currDate.setDate(currDate.getDate() + 1);
    }

    return dateRange;
}

const DateLabel = ({startDate, endDate}: Props) => {
    return(
        <Container>
            {formatDateRange(startDate, endDate).map((dateString, index) => (
                <div key={index}>
                    <LabelCell>{dateString}</LabelCell>
                </div>
            ))}
        </Container>
    )
};

export default DateLabel;