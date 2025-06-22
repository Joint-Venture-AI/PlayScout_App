import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SubscriberService } from "./subscriber.service";

const addAsSubscriber = catchAsync(async (req, res) => {
  const result = await SubscriberService.addAsSubscriber(req.body);
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Subscriber added successfully.",
    data: result,
  });
});
const getAllSubscriber = catchAsync(async (req, res) => {
  const result = await SubscriberService.getAllSubscriber();
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Subscriberlist fetched successfully.",
    data: result,
  });
});

export const SubscriberController = { addAsSubscriber, getAllSubscriber };
