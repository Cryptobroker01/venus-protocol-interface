import BigNumber from 'bignumber.js';

import vaiControllerResponses from '__mocks__/contracts/vaiController';
import { VaiController } from 'types/contracts';

import getVaiRepayApy from '.';

describe('api/queries/getVaiRepayApy', () => {
  test('returns the VAI repay APY in the correct format on success', async () => {
    const getVAIRepayRatePerBlockMock = jest.fn(
      async () => vaiControllerResponses.getVAIRepayRatePerBlock,
    );

    const fakeContract = {
      getVAIRepayRatePerBlock: getVAIRepayRatePerBlockMock,
    } as unknown as VaiController;

    const response = await getVaiRepayApy({
      vaiControllerContract: fakeContract,
    });

    expect(getVAIRepayRatePerBlockMock).toHaveBeenCalledTimes(1);
    expect(response).toMatchSnapshot();
    expect(response.repayApyPercentage instanceof BigNumber).toBeTruthy();
  });
});