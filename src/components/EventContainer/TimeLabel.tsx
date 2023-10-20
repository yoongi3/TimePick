import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const LabelCell = styled.div`
    width: 30px;
    height: 12px;
    margin: 0 6px;
    font-size: 10px;
    display: flex;
    justify-content: right;
    align-items: center;
`

type Props = {
    startTime: string;
    endTime: string;
}

const TimeLabel = ({startTime, endTime}: Props) => {
    const timeRange = [];
    let currTime = parseInt(startTime);

    while (currTime <= parseInt(endTime)) {
        const period = currTime < 12 || currTime === 24 ? 'am' : 'pm';
        const hour = (currTime === 0 || currTime === 12 || currTime === 24) ? 12 : currTime % 12;
        const formattedTime = `${hour} ${period}`;
        timeRange.push(formattedTime);
        currTime++;
    }

    return(
        <Container>
            <LabelCell></LabelCell>
            <LabelCell></LabelCell>
            {timeRange.map((time, index) => (
                <div key={index}>
                    <LabelCell>{time}</LabelCell>
                    <LabelCell></LabelCell>
                </div>
            ))}
        </Container>
    )
}

export default TimeLabel;