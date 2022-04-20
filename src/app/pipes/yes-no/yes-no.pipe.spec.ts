import { YesNoPipe } from './yes-no.pipe';

describe('YesNoPipe', () => {
    const pipe = new YesNoPipe();

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('If enter a true value, should return "Yes"', () => {
        expect(pipe.transform(true)).toBe('Yes');
    });

    it('If enter a false value, should return "No"', () => {
        expect(pipe.transform(false)).toBe('No');
    });
});
