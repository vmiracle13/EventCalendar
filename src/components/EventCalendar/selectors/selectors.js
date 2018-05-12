import moment from 'moment';
import getDiff from '../../../globals';

const compareStartTime = (a, b) => moment(a.start.slice(-5), 'HH:mm') > moment(b.start.slice(-5), 'HH:mm');

const filteredEventList = (arr) => arr.sort(compareStartTime);

const generateEventGrid = (arr) => {
    const list = filteredEventList(arr);

    const cols = [[]];
    cols[0].push(list[0]);
    list.splice(0, 1);

    list.forEach(event => {
        let counter;

        cols.forEach( (col, i, cols) => {
            col.forEach( item => {
                if (JSON.stringify(event) === JSON.stringify(item)) return;

                const eventStart = getDiff('08:00', event.start.slice(-5));
                const itemStart = getDiff('08:00', item.start.slice(-5));
                const itemDuration = getDiff(item.start.slice(-5), item.end.slice(-5));

                if (eventStart <= (itemStart + itemDuration)) {
                    counter = i;
                }
            });
        });

        if (counter >= 0) {
            if (!cols[counter + 1]) {
                cols[counter + 1] = [];
            }

            cols[counter + 1].push(event);
        } else {
            cols[0].push(event);
        }
    });

    return cols;
};

export default generateEventGrid;
