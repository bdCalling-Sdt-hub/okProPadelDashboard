import { Input, Table, Select, Modal, DatePicker, TimePicker, Button } from "antd";
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import moment from 'moment';
import { useGetAllRequestQuery } from "../redux/features/getAllRequestApi";

const { Option } = Select;

interface UserAction {
  sId: number;
  image: React.ReactNode;
  name: string;
  email: string;
  status: string;
  dateOfBirth: string;
  contact: string;
}

interface UserData {
  sId: number;
  image: React.ReactNode;
  name: string;
  email: string;
  status: string;
  currentLevel: string;
  requestedLevel: string;
  club: { id: number; club_name: string }[] | undefined;
  action: UserAction;
}

const Request: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openTrialModal, setOpenTrialModal] = useState<boolean>(false);
  const [trialMatchData, setTrialMatchData] = useState<UserData | null>(null);
  const [selectedClubs, setSelectedClubs] = useState<{ [key: number]: number }>({});
  const [selectedTeam, setSelectedTeam] = useState<number[]>([]);
  const [selectedOpponents, setSelectedOpponents] = useState<number[]>([]);
  const { data: requestMatch, isLoading, isError } = useGetAllRequestQuery();

  const pageSize = 10;

  // Use optional chaining and default empty array to handle undefined data
  const dataSource = requestMatch?.data?.map((item, index) => ({
    sId: item.request_id,
    name: item?.user?.full_name,
    location: item?.user?.location,
    currentLevel: item?.user?.current_level,
    requestedLevel: item?.request_level,
    club: item?.club || [],  // Default to empty array if club is undefined
    status: "Approved",
    action: {
      sId: item.request_id,
      name: item?.user?.full_name,
      currentLevel: item?.user?.current_level,
      requestedLevel: item?.request_level,
      club: item?.club || [],  // Default to empty array if club is undefined
      email: `player${index + 1}@example.com`,
      status: "Approved",
      dateOfBirth: "24-05-2024",
      contact: "0521545861520",
    },
  })) || [];  // Default to empty array if requestMatch.data is undefined

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Current Level",
      dataIndex: "currentLevel",
      key: "currentLevel",
    },
    {
      title: "Requested Level",
      dataIndex: "requestedLevel",
      key: "requestedLevel",
    },
    {
      title: "Club",
      dataIndex: "club",
      key: "club",
      render: (_, record) => (
        <Select
          defaultValue={record.club?.[0]?.id}
          style={{ width: 120 }}
          onChange={(value) => handleClubChange(record.sId, value)}
          dropdownRender={(menu) => (
            <div style={{ maxHeight: 150, overflowY: 'auto' }}>
              {menu}
            </div>
          )}
        >
          {record.club?.map((club) => (
            <Option key={club.id} value={club.id}>
              {club.club_name}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Trial Matches",
      dataIndex: "trialMatches",
      key: "trialMatches",
      render: (_, record) => (
        <button
          onClick={() => handleTrialMatches(record)}
          className="text-[#00BCE6] px-3"
        >
          Set Up
        </button>
      ),
    },
  ];

  const handlePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleClubChange = (sId: number, value: number) => {
    setSelectedClubs((prev) => ({ ...prev, [sId]: value }));
  };

  const handleTrialMatches = (record: UserData) => {
    setTrialMatchData(record);
    setOpenTrialModal(true);
  };

  const confirmTrialMatch = () => {
    console.log("Trial match created with:");
    console.log("Team:", selectedTeam);
    console.log("Opponents:", selectedOpponents);
    setOpenTrialModal(false);
  };

  return (
    <div className="py-4">
      <div>
        <Input
          prefix={<Search />}
          className="w-full rounded-2xl h-12 bg-base border-0 text-primary placeholder:text-gray-200"
          placeholder="Search for Listing"
          style={{ backgroundColor: "#f0f0f0", color: "#333333" }}
        />
      </div>
      <div className="py-8">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            pageSize,
            total: requestMatch?.data?.length || 0,
            current: currentPage,
            onChange: handlePage,
          }}
          rowKey="sId"
          rowClassName={() => "hover:bg-transparent"}
        />

        {/* Trial Match Modal */}
        <Modal
          title="Setup a Trial Match"
          visible={openTrialModal}
          onCancel={() => setOpenTrialModal(false)}
          footer={[
            <Button key="cancel" onClick={() => setOpenTrialModal(false)}>
              Cancel
            </Button>,
            <Button key="create" type="primary" onClick={confirmTrialMatch}>
              Create Trial Match
            </Button>,
          ]}
        >
          <div>
            <h3>Team</h3>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Select Team"
              onChange={(values) => setSelectedTeam(values)}
            >
              {dataSource.map((player) => (
                <Option key={player.sId} value={player.sId}>
                  {player.name}
                </Option>
              ))}
            </Select>

            <h3>Opponent</h3>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Select Opponents"
              onChange={(values) => setSelectedOpponents(values)}
            >
              {dataSource.map((player) => (
                <Option key={player.sId} value={player.sId}>
                  {player.name}
                </Option>
              ))}
            </Select>

            <h3>Schedule</h3>
            <TimePicker style={{ width: '100%' }} defaultValue={moment('12:08', 'HH:mm')} />
            <DatePicker style={{ width: '100%', marginTop: 10 }} />

            <h3>Club</h3>
            <Select
              defaultValue={trialMatchData?.club?.[0]?.id}
              style={{ width: '100%' }}
              onChange={(value) => handleClubChange(trialMatchData?.sId || 0, value)}
            >
              {trialMatchData?.club?.map((club) => (
                <Option key={club.id} value={club.id}>
                  {club.club_name}
                </Option>
              ))}
            </Select>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Request;
