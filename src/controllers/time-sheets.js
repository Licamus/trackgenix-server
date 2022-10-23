import TimeSheets from '../models/Time-sheets';

export const getAllTimeSheets = async (req, res) => {
  try {
    const timeSheets = await TimeSheets.find(req.query)
      .populate('task')
      .populate('employee')
      .populate('project');
    if (!timeSheets.length) {
      return res.status(404).json({
        message: 'There are no timesheets',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Time sheets found',
      data: timeSheets,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error ocurred: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

export const getTimeSheetById = async (req, res) => {
  try {
    const timeSheet = await TimeSheets.findById(req.params.id)
      .populate('task')
      .populate('employee')
      .populate('project');
    if (!timeSheet) {
      return res.status(404).json({
        message: `There are no timesheet with id: ${req.params.id}`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Time sheet found',
      data: timeSheet,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error ocurred: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

export const createTimeSheet = async (req, res) => {
  try {
    const timeSheet = new TimeSheets({
      description: req.body.description,
      date: req.body.date,
      hours: req.body.hours,
      task: req.body.task,
      employee: req.body.employee,
      project: req.body.project,
    });
    const result = await timeSheet.save();
    return res.status(201).json({
      message: 'Time sheet created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error ocurred: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

export const deleteTimeSheet = async (req, res) => {
  try {
    const timeSheet = await TimeSheets.findByIdAndDelete(req.params.id);
    if (!timeSheet) {
      return res.status(404).json({
        message: `There are no timesheet with id: ${req.params.id}`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Time sheet with id ${req.params.id} has been deleted`,
      data: timeSheet,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error ocurred: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

export const editTimeSheet = async (req, res) => {
  try {
    const timeSheet = await TimeSheets.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!timeSheet) {
      return res.status(404).json({
        message: `There are no timesheet with id: ${req.params.id}`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `Time sheet with id ${req.params.id} has been updated`,
      data: timeSheet,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error ocurred: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};
